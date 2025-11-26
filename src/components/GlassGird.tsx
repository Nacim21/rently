import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";

type GlassGridImage = {
  src: string;
  alt?: string;
  label?: string;
};

interface GlassGridProps {
  images: GlassGridImage[];
}

export function GlassGrid({ images }: GlassGridProps) {
  return (
    <section className="w-full px-6 py-10">
      <div
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {images.map((image, index) => (
          <GlassCard key={image.src ?? index} image={image} />
        ))}
      </div>
    </section>
  );
}

function GlassCard({ image }: { image: GlassGridImage }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const card = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - card.left) / card.width - 0.5;
    const relativeY = (event.clientY - card.top) / card.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <Card
        className="
          relative overflow-hidden
          rounded-2xl border border-white/30
          bg-white/20
          shadow-lg shadow-sky-100/40
          backdrop-blur-xl
          transition-all duration-300
          group-hover:shadow-xl
          group-hover:bg-white/30
        "
      >
        <CardContent className="p-3">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={image.src}
              alt={image.alt ?? "Rently preview"}
              className="
                h-40 w-full object-cover
                transition duration-300
                group-hover:brightness-110 group-hover:contrast-105
              "
            />

            {image.label && (
              <div
                className="
                  pointer-events-none
                  absolute inset-x-3 bottom-3
                  flex items-center justify-between
                  rounded-full border border-white/40
                  bg-white/30 px-3 py-1
                  text-xs font-medium text-slate-800
                  backdrop-blur-md shadow-sm
                "
              >
                <span className="truncate">{image.label}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
