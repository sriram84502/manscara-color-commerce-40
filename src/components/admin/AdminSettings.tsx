
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleSaveSettings = (event: React.FormEvent) => {
    event.preventDefault();
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your store's general configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Store Name</FormLabel>
                <Input defaultValue="Manscara Store" />
                <FormDescription>
                  This is the name that will be displayed on your store.
                </FormDescription>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Support Email</FormLabel>
                <Input defaultValue="support@manscara.com" />
              </div>
              
              <div className="space-y-2">
                <FormLabel>Store Description</FormLabel>
                <Textarea defaultValue="Premium beauty products for men" />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="maintenance-mode"
                  checked={false}
                />
                <FormLabel htmlFor="maintenance-mode" className="cursor-pointer">
                  Enable Maintenance Mode
                </FormLabel>
              </div>
              
              <Button type="submit">Save Settings</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Order Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications when new orders are placed</p>
                </div>
                <Switch 
                  checked={isNotificationsEnabled} 
                  onCheckedChange={setIsNotificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when products are running low</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">User Registration Alerts</p>
                  <p className="text-sm text-gray-500">Receive alerts when new users register</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Test Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
