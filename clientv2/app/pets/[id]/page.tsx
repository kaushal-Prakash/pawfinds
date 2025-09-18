"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ArrowLeft, MapPin, User, Stethoscope, Home, Users } from "lucide-react"

// Mock data (same as browse page - in real app this would come from API)
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    size: "Large",
    weight: "65 lbs",
    location: "San Francisco, CA",
    description:
      "Buddy is a friendly and energetic Golden Retriever who absolutely loves life! He's great with children and other dogs, making him the perfect addition to an active family. Buddy enjoys long walks, playing fetch in the park, and swimming. He's house-trained, knows basic commands, and is eager to learn more. This sweet boy is looking for a family who can match his energy and give him the love and attention he deserves.",
    images: ["/golden-retriever-dog-happy-playing.jpg", "/golden-retriever-dog-sitting-portrait.jpg", "/golden-retriever-dog-running-outdoors.jpg"],
    vaccinated: true,
    neutered: true,
    microchipped: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithCats: false,
    energyLevel: "High",
    trainingLevel: "Basic commands",
    specialNeeds: "None",
    adoptionFee: "$250",
    contactInfo: {
      shelter: "Golden Gate Animal Rescue",
      phone: "(555) 123-4567",
      email: "adopt@ggrescue.org",
    },
    medicalHistory: "Up to date on all vaccinations, heartworm negative, recently had dental cleaning.",
    personalityTraits: ["Friendly", "Energetic", "Loyal", "Playful", "Social"],
  },
  // Add other pets here...
]

export default function PetDetailPage() {
  const params = useParams()
  const petId = Number.parseInt(params.id as string)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const pet = mockPets.find((p) => p.id === petId)

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-6">The pet you're looking for doesn't exist.</p>
          <Link href="/browse">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-2xl font-bold text-foreground">PawFinds</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Browse
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={pet.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {pet.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${pet.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold text-foreground">{pet.name}</h1>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {pet.type}
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {pet.location}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{pet.description}</p>
            </div>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Breed</p>
                  <p className="font-medium">{pet.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{pet.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{pet.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{pet.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{pet.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Energy Level</p>
                  <p className="font-medium">{pet.energyLevel}</p>
                </div>
              </CardContent>
            </Card>

            {/* Adoption Fee */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Adoption Fee</p>
                  <p className="text-3xl font-bold text-primary">{pet.adoptionFee}</p>
                </div>
              </CardContent>
            </Card>

            {/* Adopt Button */}
            <Link href={`/adopt/${pet.id}`}>
              <Button size="lg" className="w-full text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Start Adoption Process
              </Button>
            </Link>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Health & Care */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" />
                Health & Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {pet.vaccinated && <Badge variant="secondary">Vaccinated</Badge>}
                {pet.neutered && <Badge variant="secondary">Spayed/Neutered</Badge>}
                {pet.microchipped && <Badge variant="secondary">Microchipped</Badge>}
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-2">Medical History</p>
                <p className="text-sm text-muted-foreground">{pet.medicalHistory}</p>
              </div>

              <div>
                <p className="font-medium mb-2">Special Needs</p>
                <p className="text-sm text-muted-foreground">{pet.specialNeeds}</p>
              </div>
            </CardContent>
          </Card>

          {/* Personality & Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Personality & Home Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2">Personality Traits</p>
                <div className="flex flex-wrap gap-2">
                  {pet.personalityTraits.map((trait, index) => (
                    <Badge key={index} variant="outline">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good with children</span>
                  <Badge variant={pet.goodWithKids ? "secondary" : "destructive"}>
                    {pet.goodWithKids ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good with other dogs</span>
                  <Badge variant={pet.goodWithPets ? "secondary" : "destructive"}>
                    {pet.goodWithPets ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good with cats</span>
                  <Badge variant={pet.goodWithCats ? "secondary" : "destructive"}>
                    {pet.goodWithCats ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-2">Training Level</p>
                <p className="text-sm text-muted-foreground">{pet.trainingLevel}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Get in touch with the shelter for more information about {pet.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium mb-1">Shelter</p>
                <p className="text-sm text-muted-foreground">{pet.contactInfo.shelter}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Phone</p>
                <p className="text-sm text-muted-foreground">{pet.contactInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <p className="text-sm text-muted-foreground">{pet.contactInfo.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
