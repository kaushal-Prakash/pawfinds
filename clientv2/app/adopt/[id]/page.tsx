"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Heart, ArrowLeft, ArrowRight, Send } from "lucide-react"

// Mock pet data (same as detail page)
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    image: "/golden-retriever-dog-happy.jpg",
    adoptionFee: "$250",
  },
]

interface ApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string

  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  housingType: string
  ownOrRent: string
  landlordContact: string

  // Household Information
  householdSize: string
  hasChildren: string
  childrenAges: string
  hasOtherPets: string
  otherPetsDetails: string

  // Experience & Lifestyle
  petExperience: string
  workSchedule: string
  exerciseCommitment: string
  vacationPlans: string

  // Pet-Specific Questions
  whyAdopt: string
  expectations: string
  challenges: string

  // References
  veterinarianName: string
  veterinarianPhone: string
  personalReference1Name: string
  personalReference1Phone: string
  personalReference2Name: string
  personalReference2Phone: string

  // Agreement
  agreeToTerms: boolean
  agreeToHomeVisit: boolean
  agreeToFollowUp: boolean
}

const initialFormData: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  housingType: "",
  ownOrRent: "",
  landlordContact: "",
  householdSize: "",
  hasChildren: "",
  childrenAges: "",
  hasOtherPets: "",
  otherPetsDetails: "",
  petExperience: "",
  workSchedule: "",
  exerciseCommitment: "",
  vacationPlans: "",
  whyAdopt: "",
  expectations: "",
  challenges: "",
  veterinarianName: "",
  veterinarianPhone: "",
  personalReference1Name: "",
  personalReference1Phone: "",
  personalReference2Name: "",
  personalReference2Phone: "",
  agreeToTerms: false,
  agreeToHomeVisit: false,
  agreeToFollowUp: false,
}

export default function AdoptionApplicationPage() {
  const params = useParams()
  const petId = Number.parseInt(params.id as string)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const pet = mockPets.find((p) => p.id === petId)
  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-6">The pet you're trying to adopt doesn't exist.</p>
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

  const updateFormData = (field: keyof ApplicationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // TODO: Submit to backend API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 2-3 business days.",
      })

      // TODO: Redirect to confirmation page
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Let's start with your basic information.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                required
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Address Information</h2>
              <p className="text-muted-foreground">Where will {pet.name} be living?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Housing Type *</Label>
                <RadioGroup
                  value={formData.housingType}
                  onValueChange={(value) => updateFormData("housingType", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="house" id="house" />
                    <Label htmlFor="house">House</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apartment" id="apartment" />
                    <Label htmlFor="apartment">Apartment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="condo" id="condo" />
                    <Label htmlFor="condo">Condo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Do you own or rent? *</Label>
                <RadioGroup value={formData.ownOrRent} onValueChange={(value) => updateFormData("ownOrRent", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="own" id="own" />
                    <Label htmlFor="own">Own</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rent" id="rent" />
                    <Label htmlFor="rent">Rent</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.ownOrRent === "rent" && (
                <div className="space-y-2">
                  <Label htmlFor="landlordContact">Landlord Contact Information</Label>
                  <Textarea
                    id="landlordContact"
                    placeholder="Please provide your landlord's name and contact information"
                    value={formData.landlordContact}
                    onChange={(e) => updateFormData("landlordContact", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Household Information</h2>
              <p className="text-muted-foreground">Tell us about your household and family.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="householdSize">How many people live in your household? *</Label>
              <Select value={formData.householdSize} onValueChange={(value) => updateFormData("householdSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select household size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4 people</SelectItem>
                  <SelectItem value="5+">5+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Do you have children? *</Label>
                <RadioGroup
                  value={formData.hasChildren}
                  onValueChange={(value) => updateFormData("hasChildren", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="children-yes" />
                    <Label htmlFor="children-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="children-no" />
                    <Label htmlFor="children-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasChildren === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="childrenAges">Ages of children</Label>
                  <Input
                    id="childrenAges"
                    placeholder="e.g., 5, 8, 12"
                    value={formData.childrenAges}
                    onChange={(e) => updateFormData("childrenAges", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Do you currently have other pets? *</Label>
                <RadioGroup
                  value={formData.hasOtherPets}
                  onValueChange={(value) => updateFormData("hasOtherPets", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pets-yes" />
                    <Label htmlFor="pets-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pets-no" />
                    <Label htmlFor="pets-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasOtherPets === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="otherPetsDetails">Please describe your other pets</Label>
                  <Textarea
                    id="otherPetsDetails"
                    placeholder="Include type, breed, age, and temperament"
                    value={formData.otherPetsDetails}
                    onChange={(e) => updateFormData("otherPetsDetails", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Experience & Lifestyle</h2>
              <p className="text-muted-foreground">Help us understand your experience with pets and lifestyle.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="petExperience">Describe your experience with pets *</Label>
              <Textarea
                id="petExperience"
                placeholder="Tell us about your history with pets, training experience, etc."
                value={formData.petExperience}
                onChange={(e) => updateFormData("petExperience", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workSchedule">What is your typical work schedule? *</Label>
              <Textarea
                id="workSchedule"
                placeholder="Describe your work hours and how much time you'll have for your pet"
                value={formData.workSchedule}
                onChange={(e) => updateFormData("workSchedule", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseCommitment">How will you ensure your pet gets adequate exercise? *</Label>
              <Textarea
                id="exerciseCommitment"
                placeholder="Describe your plans for walks, playtime, and exercise"
                value={formData.exerciseCommitment}
                onChange={(e) => updateFormData("exerciseCommitment", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vacationPlans">What are your plans for pet care during vacations? *</Label>
              <Textarea
                id="vacationPlans"
                placeholder="How will you care for your pet when you travel?"
                value={formData.vacationPlans}
                onChange={(e) => updateFormData("vacationPlans", e.target.value)}
                required
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Pet-Specific Questions</h2>
              <p className="text-muted-foreground">Tell us about your interest in {pet.name}.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyAdopt">Why do you want to adopt {pet.name}? *</Label>
              <Textarea
                id="whyAdopt"
                placeholder="What draws you to this particular pet?"
                value={formData.whyAdopt}
                onChange={(e) => updateFormData("whyAdopt", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectations">What are your expectations for this pet? *</Label>
              <Textarea
                id="expectations"
                placeholder="What role will this pet play in your life and family?"
                value={formData.expectations}
                onChange={(e) => updateFormData("expectations", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">How would you handle behavioral challenges? *</Label>
              <Textarea
                id="challenges"
                placeholder="Describe how you would address issues like excessive barking, chewing, etc."
                value={formData.challenges}
                onChange={(e) => updateFormData("challenges", e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">References</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="veterinarianName">Veterinarian Name</Label>
                  <Input
                    id="veterinarianName"
                    placeholder="Current or previous vet"
                    value={formData.veterinarianName}
                    onChange={(e) => updateFormData("veterinarianName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="veterinarianPhone">Veterinarian Phone</Label>
                  <Input
                    id="veterinarianPhone"
                    type="tel"
                    value={formData.veterinarianPhone}
                    onChange={(e) => updateFormData("veterinarianPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personalReference1Name">Personal Reference 1 Name *</Label>
                  <Input
                    id="personalReference1Name"
                    value={formData.personalReference1Name}
                    onChange={(e) => updateFormData("personalReference1Name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalReference1Phone">Personal Reference 1 Phone *</Label>
                  <Input
                    id="personalReference1Phone"
                    type="tel"
                    value={formData.personalReference1Phone}
                    onChange={(e) => updateFormData("personalReference1Phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personalReference2Name">Personal Reference 2 Name</Label>
                  <Input
                    id="personalReference2Name"
                    value={formData.personalReference2Name}
                    onChange={(e) => updateFormData("personalReference2Name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalReference2Phone">Personal Reference 2 Phone</Label>
                  <Input
                    id="personalReference2Phone"
                    type="tel"
                    value={formData.personalReference2Phone}
                    onChange={(e) => updateFormData("personalReference2Phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review & Agreement</h2>
              <p className="text-muted-foreground">Please review your information and agree to our terms.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Applicant</h4>
                  <p>
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    {formData.email} • {formData.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>{formData.address}</p>
                  <p>
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Housing</h4>
                  <p>
                    {formData.housingType} • {formData.ownOrRent}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the terms and conditions of adoption *
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToHomeVisit"
                  checked={formData.agreeToHomeVisit}
                  onCheckedChange={(checked) => updateFormData("agreeToHomeVisit", checked as boolean)}
                />
                <Label htmlFor="agreeToHomeVisit" className="text-sm">
                  I agree to a home visit as part of the adoption process *
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToFollowUp"
                  checked={formData.agreeToFollowUp}
                  onCheckedChange={(checked) => updateFormData("agreeToFollowUp", checked as boolean)}
                />
                <Label htmlFor="agreeToFollowUp" className="text-sm">
                  I agree to follow-up contact to ensure the pet's wellbeing *
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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
          <Link href={`/pets/${petId}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {pet.name}
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Pet Info Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Adoption Application for {pet.name}</h1>
                  <p className="text-muted-foreground">
                    {pet.breed} • Adoption Fee: {pet.adoptionFee}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Content */}
          <Card className="mb-8">
            <CardContent className="pt-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.agreeToTerms || !formData.agreeToHomeVisit || !formData.agreeToFollowUp || isSubmitting
                }
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
