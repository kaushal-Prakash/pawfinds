"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Filter, MapPin, Calendar, User } from "lucide-react"

// Mock data for pets
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    size: "Large",
    location: "San Francisco, CA",
    description: "Friendly and energetic dog who loves playing fetch and going on walks.",
    image: "/golden-retriever-dog-happy.jpg",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "1 year",
    gender: "Female",
    size: "Medium",
    location: "Los Angeles, CA",
    description: "Sweet and affectionate cat who loves to cuddle and play with toys.",
    image: "/siamese-cat-blue-eyes.jpg",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: false,
  },
  {
    id: 3,
    name: "Max",
    type: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    gender: "Male",
    size: "Large",
    location: "Seattle, WA",
    description: "Loyal and intelligent dog, great for active families who enjoy outdoor activities.",
    image: "/german-shepherd-dog-sitting.jpg",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 4,
    name: "Bella",
    type: "Cat",
    breed: "Persian",
    age: "4 years",
    gender: "Female",
    size: "Medium",
    location: "Portland, OR",
    description: "Calm and gentle cat who enjoys quiet environments and gentle petting.",
    image: "/persian-cat-fluffy-white.jpg",
    vaccinated: true,
    neutered: true,
    goodWithKids: false,
    goodWithPets: false,
  },
  {
    id: 5,
    name: "Charlie",
    type: "Dog",
    breed: "Labrador Mix",
    age: "5 years",
    gender: "Male",
    size: "Medium",
    location: "Denver, CO",
    description: "Gentle senior dog looking for a quiet home to spend his golden years.",
    image: "/labrador-mix-dog-brown.jpg",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 6,
    name: "Mia",
    type: "Cat",
    breed: "Tabby",
    age: "6 months",
    gender: "Female",
    size: "Small",
    location: "Austin, TX",
    description: "Playful kitten full of energy, loves to explore and play with everything.",
    image: "/tabby-kitten-playful.jpg",
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true,
  },
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [filteredPets, setFilteredPets] = useState(mockPets)

  // Filter pets based on search and filters
  const filterPets = () => {
    const filtered = mockPets.filter((pet) => {
      const matchesSearch =
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || pet.type.toLowerCase() === typeFilter
      const matchesAge =
        ageFilter === "all" ||
        (ageFilter === "young" && pet.age.includes("month")) ||
        pet.age.includes("1 year") ||
        (ageFilter === "adult" && (pet.age.includes("2") || pet.age.includes("3") || pet.age.includes("4"))) ||
        (ageFilter === "senior" && (pet.age.includes("5") || pet.age.includes("6") || pet.age.includes("7")))
      const matchesSize = sizeFilter === "all" || pet.size.toLowerCase() === sizeFilter

      return matchesSearch && matchesType && matchesAge && matchesSize
    })
    setFilteredPets(filtered)
  }

  // Apply filters whenever search term or filters change
  useState(() => {
    filterPets()
  }, [searchTerm, typeFilter, ageFilter, sizeFilter])

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
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Perfect Pet</h1>
          <p className="text-lg text-muted-foreground">
            Browse through our available pets and find your new best friend.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={filterPets} className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="young">Young (0-1 year)</SelectItem>
                <SelectItem value="adult">Adult (2-4 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPets.length} of {mockPets.length} pets
          </p>
        </div>

        {/* Pet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {pet.type}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{pet.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pet.age}
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pet.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pet.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{pet.breed}</Badge>
                  <Badge variant="outline">{pet.size}</Badge>
                  <Badge variant="outline">
                    <User className="h-3 w-3 mr-1" />
                    {pet.gender}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-4 text-xs">
                  {pet.vaccinated && <Badge variant="secondary">Vaccinated</Badge>}
                  {pet.neutered && <Badge variant="secondary">Spayed/Neutered</Badge>}
                  {pet.goodWithKids && <Badge variant="secondary">Good with Kids</Badge>}
                  {pet.goodWithPets && <Badge variant="secondary">Good with Pets</Badge>}
                </div>

                <div className="flex gap-2">
                  <Link href={`/pets/${pet.id}`} className="flex-1">
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No pets found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
                setAgeFilter("all")
                setSizeFilter("all")
                setFilteredPets(mockPets)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
