import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Ship, MapPin, Package, FileText, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

interface QuoteRequestFormProps {
  children: React.ReactNode;
}

const QuoteRequestForm = ({ children }: QuoteRequestFormProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    port_name: "",
    vessel_type: "",
    grt_nrt: "",
    dwt: "",
    loa_beam: "",
    built: "",
    crane_capacity: "",
    commodity: "",
    quantity: "",
    additional_notes: "",
  });

  const vesselTypes = [
    "Container Ship",
    "Bulk Carrier",
    "Tanker",
    "General Cargo",
    "Ro-Ro",
    "Passenger Ship",
    "Fishing Vessel",
    "Offshore Vessel",
    "Tug Boat",
    "Barge",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'country', 'port_name', 'vessel_type', 'grt_nrt', 'dwt', 'loa_beam', 'built', 'crane_capacity', 'commodity', 'quantity'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to database first
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([formData])
        .select();

      if (error) {
        console.error('Error saving quote request:', error);
        throw error;
      }

      // Send emails using EmailJS
      const templateParams = {
        to_name: 'Gasawa Shipping',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        country: formData.country,
        port_name: formData.port_name,
        vessel_type: formData.vessel_type,
        grt_nrt: formData.grt_nrt,
        dwt: formData.dwt,
        loa_beam: formData.loa_beam,
        built: formData.built,
        crane_capacity: formData.crane_capacity,
        commodity: formData.commodity,
        quantity: formData.quantity,
        additional_notes: formData.additional_notes || 'None',
        reply_to: formData.email,
      };

      // EmailJS credentials
      const SERVICE_ID = 'service_ofst3p8';
      const TEMPLATE_ID = 'template_8p1nprb';
      const PUBLIC_KEY = 'bNfT3rgt0Itdd-1SC';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast({
        title: "Quote Request Sent!",
        description: "Thank you for your request. We'll get back to you within 24 hours.",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        port_name: "",
        vessel_type: "",
        grt_nrt: "",
        dwt: "",
        loa_beam: "",
        built: "",
        crane_capacity: "",
        commodity: "",
        quantity: "",
        additional_notes: "",
      });
      setOpen(false);

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-maritime-navy">
            <Ship className="w-6 h-6" />
            Request Custom Quote
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-maritime-navy">
                <FileText className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-maritime-navy">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-maritime-navy">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-maritime-navy">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-maritime-navy">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Port Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-maritime-navy">
                <MapPin className="w-5 h-5" />
                Port Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-maritime-navy">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="port_name" className="text-maritime-navy">Port Name *</Label>
                  <Input
                    id="port_name"
                    value={formData.port_name}
                    onChange={(e) => handleInputChange('port_name', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vessel Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-maritime-navy">
                <Ship className="w-5 h-5" />
                Vessel Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="vessel_type" className="text-maritime-navy">Select Type *</Label>
                <Select value={formData.vessel_type} onValueChange={(value) => handleInputChange('vessel_type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="SELECT" />
                  </SelectTrigger>
                  <SelectContent>
                    {vesselTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Vessel Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-maritime-navy">
                <Ship className="w-5 h-5" />
                Vessel Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grt_nrt" className="text-maritime-navy">GRT/NRT *</Label>
                  <Input
                    id="grt_nrt"
                    value={formData.grt_nrt}
                    onChange={(e) => handleInputChange('grt_nrt', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dwt" className="text-maritime-navy">DWT *</Label>
                  <Input
                    id="dwt"
                    value={formData.dwt}
                    onChange={(e) => handleInputChange('dwt', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="loa_beam" className="text-maritime-navy">LOA/BEAM *</Label>
                  <Input
                    id="loa_beam"
                    value={formData.loa_beam}
                    onChange={(e) => handleInputChange('loa_beam', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="built" className="text-maritime-navy">BUILT *</Label>
                  <Input
                    id="built"
                    value={formData.built}
                    onChange={(e) => handleInputChange('built', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="crane_capacity" className="text-maritime-navy">Crane Capacity *</Label>
                  <Input
                    id="crane_capacity"
                    value={formData.crane_capacity}
                    onChange={(e) => handleInputChange('crane_capacity', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cargo Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-maritime-navy">
                <Package className="w-5 h-5" />
                Cargo Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="commodity" className="text-maritime-navy">Commodity *</Label>
                  <Input
                    id="commodity"
                    value={formData.commodity}
                    onChange={(e) => handleInputChange('commodity', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantity" className="text-maritime-navy">Quantity *</Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-maritime-navy">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.additional_notes}
                onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                placeholder="Any additional requirements, special instructions, or notes..."
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ocean"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit Quote Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestForm;