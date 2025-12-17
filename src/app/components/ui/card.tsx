import * as React from "react";
import { cn } from "../../../app/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  image?: string;
  footer?: React.ReactNode;
  hover?: boolean;
}

export function Card({
  className,
  title,
  description,
  image,
  footer,
  hover = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white shadow-sm transition-all",
        hover && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {image && (
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title || "card image"}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* ✅ Moved children inside for flexibility */}
      <div className="p-4">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>

      {footer && <div className="border-t p-4 bg-gray-50">{footer}</div>}
    </div>
  );
}

// ✅ Add CardContent (missing before)
export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}
