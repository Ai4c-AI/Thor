import * as React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loadingVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "h-screen w-full bg-gradient-to-br from-background to-muted/50",
        compact: "h-32 w-full bg-background/80 backdrop-blur-sm",
        inline: "h-16 w-full",
        overlay: "fixed inset-0 z-[9999] bg-background/95 backdrop-blur-lg",
        fullscreen: "fixed inset-0 z-[9999] bg-background"
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "overlay",
      size: "default"
    }
  }
)

interface ProgressBarProps extends React.ComponentProps<"div"> {
  progress?: number
  animated?: boolean
}

const ProgressBar = React.memo<ProgressBarProps>(({
  className,
  progress: controlledProgress,
  animated = true,
  ...props
}) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (controlledProgress !== undefined) {
      setProgress(controlledProgress)
      return
    }

    if (!animated) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 200)

    return () => clearInterval(timer)
  }, [controlledProgress, animated])

  return (
    <div
      data-slot="progress-bar"
      className={cn(
        "w-80 h-2 bg-accent/50 rounded-full overflow-hidden border border-border/50",
        className
      )}
      {...props}
    >
      <motion.div
        data-slot="progress-fill"
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  )
})

interface LoadingSpinnerProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg"
}

const LoadingSpinner = React.memo<LoadingSpinnerProps>(({
  className,
  size = "md",
  ...props
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div
      data-slot="loading-spinner"
      className={cn(
        "animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
})

interface LoadingDotsProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg"
}

const LoadingDots = React.memo<LoadingDotsProps>(({
  className,
  size = "md",
  ...props
}) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  }

  return (
    <div
      data-slot="loading-dots"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "rounded-full bg-primary",
            sizeClasses[size]
          )}
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
})

interface LoadingProps extends React.ComponentProps<"div">,
  VariantProps<typeof loadingVariants> {
  title?: string
  description?: string
  showProgress?: boolean
  showSpinner?: boolean
  showDots?: boolean
  showBrand?: boolean
  progress?: number
}

const Loading = React.memo<LoadingProps>(({
  className,
  variant,
  size,
  title,
  description,
  showProgress = true,
  showSpinner = false,
  showDots = true,
  showBrand = true,
  progress,
  style,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <div
      data-slot="loading"
      className={cn(loadingVariants({ variant, size, className }))}
      style={{ userSelect: 'none', ...style }}
      {...props}
    >
      <div
        data-slot="loading-content"
        className="flex flex-col items-center gap-6 w-full max-w-md px-4"
      >
        {/* Brand Section */}
        {showBrand && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                data-slot="brand-icon"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm border border-border/50"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-primary-foreground font-bold text-xl">⚡</span>
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Thor AI Gateway
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-sm font-medium text-muted-foreground">
                {t('welcome.hero.subtitle', '专业的AI网关管理平台')}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Loading Indicators */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: showBrand ? 0.6 : 0.2, duration: 0.4 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          {/* Progress Bar */}
          {showProgress && (
            <ProgressBar
              progress={progress}
              className="w-full max-w-xs"
            />
          )}

          {/* Spinner */}
          {showSpinner && (
            <LoadingSpinner size="lg" />
          )}

          {/* Title and Description */}
          {(title || description) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: showBrand ? 1 : 0.5, duration: 0.4 }}
              className="text-center space-y-1"
            >
              {title && (
                <p className="text-sm font-medium text-foreground">
                  {title}
                </p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </motion.div>
          )}

          {/* Loading Dots */}
          {showDots && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: showBrand ? 1.2 : 0.7, duration: 0.4 }}
            >
              <LoadingDots size={size === "lg" ? "lg" : "md"} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
})

ProgressBar.displayName = "ProgressBar"
LoadingSpinner.displayName = "LoadingSpinner"
LoadingDots.displayName = "LoadingDots"
Loading.displayName = "Loading"

// Legacy component for backward compatibility
const FullscreenLoading = React.memo<{ title?: string }>(({ title }) => {
  return <Loading title={title} variant="default" />
})

FullscreenLoading.displayName = "FullscreenLoading"

export {
  Loading,
  ProgressBar,
  LoadingSpinner,
  LoadingDots,
  FullscreenLoading,
  loadingVariants,
  type LoadingProps
}

export default Loading