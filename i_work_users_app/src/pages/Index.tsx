import { Users, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border">
            <span className="text-sm font-medium text-foreground">Choose Your Path</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Join Our Platform
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Whether you're a skilled worker or a project manager, find the perfect match
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Labour Card */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-[hsl(var(--labour-from))] to-[hsl(var(--labour-to))] p-8 sm:p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Icon Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[hsl(var(--labour-accent))] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Labour</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                  Connect with quality projects and build your professional reputation as a skilled worker
                </p>
              </div>

              {/* Hover Effect - Optional Button */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-6">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>

          {/* Contractor Card */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-[hsl(var(--contractor-from))] to-[hsl(var(--contractor-to))] p-8 sm:p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Icon Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[hsl(var(--contractor-accent))] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Contractor</h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-md">
                  Post projects, manage teams, and find the perfect skilled workers for your business
                </p>
              </div>

              {/* Get Started Button */}
              <div className="mt-6">
                <Button 
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
