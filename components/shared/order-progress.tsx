"use client";

import * as React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrderProgressStep {
  id: string;
  title: string;
  description?: string;
}

interface OrderProgressProps {
  steps: OrderProgressStep[];
  currentStep: number;
  className?: string;
}

interface OrderProgressGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface OrderProgressSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  title: string;
  description?: string;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
}

function OrderProgress({ steps, currentStep, className }: OrderProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <OrderProgressGroup>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <OrderProgressSlot
              index={index}
              title={step.title}
              description={step.description}
              isActive={index === currentStep}
              isCompleted={index < currentStep}
              isLast={index === steps.length - 1}
            />
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "grow md:h-1 h-10 w-1 md:mx-3 my-3 transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </OrderProgressGroup>
    </div>
  );
}

function OrderProgressGroup({ className, ...props }: OrderProgressGroupProps) {
  return (
    <div
      data-slot="order-progress-group"
      className={cn("md:flex items-center w-full", className)}
      {...props}
    />
  );
}

function OrderProgressSlot({
  title,
  description,
  isActive,
  isCompleted,
  isLast,
  className,
  ...props
}: OrderProgressSlotProps) {
  return (
    <div
      className={cn("flex md:flex-col items-center gap-3 shrink-0", className)}
      {...props}
    >
      <div className="relative">
        {isCompleted ? (
          <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
        ) : isActive ? (
          <div className="w-10 h-10 rounded-full border-2 border-blue-ocean flex items-center justify-center bg-blue-ocean/5">
            <div className="w-3 h-3 rounded-full bg-blue-ocean" />
          </div>
        ) : (
          <CheckCircle2
            className="w-10 h-10 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>

      <div className="md:text-center text-start">
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            isCompleted
              ? "text-primary"
              : isActive
              ? "text-blue-ocean"
              : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

export { OrderProgress, OrderProgressGroup, OrderProgressSlot };
