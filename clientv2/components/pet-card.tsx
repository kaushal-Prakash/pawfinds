import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Calendar, User } from "lucide-react"

interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: string
  gender: string
  size: string
  location: string
  description: string
  image: string
  vaccinated: boolean
  neutered: boolean
  goodWithKids: boolean
  goodWithPets: boolean
}

interface PetCardProps {
  pet: Pet
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  )
}
