import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PDAForm = () => {
  useEffect(() => {
    // Set timestamp when component mounts
    const timestampField = document.getElementById('timestamp') as HTMLInputElement;
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('PDA Form submitted');
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">PDA Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="pdaForm" onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <Input type="text" name="from_name" placeholder="Your Name" required />
                <Input type="email" name="from_email" placeholder="Your Email" required />
                <Input type="text" name="from_phone" placeholder="Phone" />
                <Input type="text" name="from_company" placeholder="Company" />
              </div>

              {/* Port Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Port Information</h3>
                <Input type="text" name="from_country" placeholder="Country" required />
                <Input type="text" name="from_port_name" placeholder="Port Name" required />
              </div>

              {/* Vessel Type */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Vessel Type</h3>
                <Select name="vessel_type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vessel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bulk Carrier">Bulk Carrier</SelectItem>
                    <SelectItem value="Tanker">Tanker</SelectItem>
                    <SelectItem value="Container Ship">Container Ship</SelectItem>
                    <SelectItem value="Livestock Carrier">Livestock Carrier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hidden timestamp field */}
              <input type="hidden" name="time" id="timestamp" />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PDAForm;