import { Card } from "../ui/card";
import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Delivery",
      description: "On orders over $50",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Get Refund",
      description: "Return within 30 days",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Payment",
      description: "100% secure payment",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-orange-50 dark:bg-white"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-orange-500">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground dark:text-black">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
