"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

export default function TemplateSelector({ activeTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and modern design for corporate environments",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design for creative industries",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "academic",
      name: "Academic",
      description: "Formal design for academic positions",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-dark-text">Choose a Template</h3>
      <RadioGroup value={activeTemplate} onValueChange={onSelectTemplate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
              <Label htmlFor={template.id} className="cursor-pointer">
                <Card
                  className={`overflow-hidden transition-all glassmorphism ${
                    activeTemplate === template.id
                      ? "ring-2 ring-pastel-purple dark:ring-pastel-darkPurple shadow-lg"
                      : "hover:bg-pastel-blue/10 dark:hover:bg-pastel-darkBlue/20 shadow"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-32 object-cover"
                    />
                    {activeTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-pastel-purple/80 dark:bg-pastel-darkPurple/80 text-white p-1 rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-dark-text">{template.name}</h4>
                    <p className="text-sm text-dark-muted">{template.description}</p>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

