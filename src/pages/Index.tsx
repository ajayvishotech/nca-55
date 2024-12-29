import { Award, Book, Clock, MessageCircle, Target, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="space-y-12 animate-fadeIn -mt-6 -mx-4 md:-mx-6">
      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fadeIn">
            Your One-Stop Solution for UPSC Preparation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn [animation-delay:200ms]">
            Join thousands of successful aspirants who have achieved their dreams with our comprehensive study programs
          </p>
          <Button size="lg" className="animate-fadeIn [animation-delay:400ms]">
            Start Your Journey
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-xl" />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold">Doubts & Solutions</h3>
              <p className="text-sm text-gray-600">
                Get quick and detailed solutions to clarify your doubts
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold">Interactive Live Classes</h3>
              <p className="text-sm text-gray-600">
                Attend interactive live classes with top educators
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Book className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold">Study Material</h3>
              <p className="text-sm text-gray-600">
                Access high-quality study materials and resources
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-heading font-semibold">Mock Tests</h3>
              <p className="text-sm text-gray-600">
                Practice with realistic mock tests to analyze and improve
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Current Affairs Carousel */}
      <section className="px-4 md:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">Current Affairs</h2>
          <Button variant="ghost">View All</Button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3, 4].map((item) => (
              <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-6">
                  <div className="space-y-4">
                    <span className="text-sm text-primary font-medium">Daily Update</span>
                    <h3 className="font-heading font-semibold line-clamp-2">
                      Impact of Recent Economic Policies on Indian Markets
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      Analysis of how recent policy changes are affecting various sectors of the Indian economy...
                    </p>
                    <Button variant="ghost" className="w-full">Read More</Button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Progress Overview */}
      <section className="px-4 md:px-6">
        <Card className="p-6">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold">Your Progress</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Course Progress</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                </div>
                <Progress value={65} className="mt-4" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                    <p className="text-2xl font-bold">12.5h</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mock Test Score</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;