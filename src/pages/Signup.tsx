
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Phone, MapPin, User as UserIcon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/utils/api";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

const placeholderAddress = {
  street: "13-6-3/1 RAMA CHANDRA RAO PETA",
  city: "TADEPALLIGUDEM",
  state: "ANDHRA PRADESH 534102",
};

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  if (!pw) return { label: "", color: "" };
  if (score <= 2) return { label: "Weak", color: "bg-red-300 text-red-800" };
  if (score <= 4) return { label: "Moderate", color: "bg-yellow-200 text-yellow-900" };
  return { label: "Strong", color: "bg-green-200 text-green-800" };
}

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const pwStrength = getPasswordStrength(pw);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!name.trim()) {
      setError("Please fill all fields.");
      return;
    }
    
    if (
      !street.trim() ||
      !city.trim() ||
      !stateValue.trim() ||
      !postalCode.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !pw
    ) {
      setError("Please fill all fields.");
      return;
    }
    
    if (pwStrength.label === "Weak") {
      setError("Password is too weak.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const address = `${street}, ${city}, ${stateValue}, ${postalCode}`;
      
      // Register user with API
      await api.auth.signup({
        name,
        email,
        phone,
        password: pw,
      });
      
      // Log in after signup
      const loginResponse = await api.auth.login(email, pw);
      
      // Store token
      localStorage.setItem("manscara_token", loginResponse.token);
      
      // Store user data with address (API doesn't store address directly)
      const userData = {
        ...loginResponse.user,
        address,
      };
      
      // Set cookie with user data
      Cookies.set('manscara_current_user', JSON.stringify(userData), { expires: 7 });
      
      setSuccess("Signup successful! Redirecting...");
      toast({
        title: "Account created successfully",
        description: "Welcome to Manscara!",
      });
      
      setTimeout(() => navigate("/"), 1300);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-beige flex justify-center items-center animate-fade-in flex-col">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-card w-full max-w-md flex flex-col gap-6 border border-beige animate-slide-in-right mt-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="text-black" />
          <h2 className="text-2xl font-jakarta font-bold text-black">Sign Up</h2>
        </div>
        <div className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {/* Address fields: Street, City, State, Postal Code */}
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Street"
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              required
              autoComplete="street-address"
              maxLength={60}
              spellCheck="true"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 w-1/2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="City"
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                maxLength={40}
                spellCheck="true"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-2 w-1/2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="State"
                type="text"
                value={stateValue}
                onChange={e => setStateValue(e.target.value)}
                required
                maxLength={40}
                spellCheck="true"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Postal Code"
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              required
              maxLength={12}
              spellCheck="false"
              disabled={isLoading}
            />
          </div>
          {/* Password */}
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Password"
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {pw && (
              <div className="flex items-center gap-2 mt-1 ml-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${pwStrength.color} transition-all`}>
                  {pwStrength.label}
                </span>
                {pwStrength.label === "Weak" && (
                  <span className="text-xs text-gray-400">Try a longer, more complex password.</span>
                )}
              </div>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Button
          type="submit"
          className="w-full font-bold rounded-lg bg-black text-beige hover:scale-105 hover:bg-accent transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-accent underline">
            Sign in
          </a>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Example:{" "}
          <span className="italic">
            {placeholderAddress.street}, {placeholderAddress.city}, {placeholderAddress.state}
          </span>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default Signup;
