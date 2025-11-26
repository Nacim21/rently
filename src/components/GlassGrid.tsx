import { useState, useRef, type MouseEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type GlassGridImage = {
  src: string;
  label?: string;
};

interface GlassGridProps {
  images: GlassGridImage[];
}


 //overlapping glass cards row.
  //hover will highlight card moves up and forward.
  //click opens larger preview dialog.
 
export function GlassGrid({ images }: GlassGridProps) {
  const [activeImage, setActiveImage] = useState<GlassGridImage | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (!images?.length) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -240 : 240;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      {/* z-20 para no quedar detrás del card de create account , porfa no le quiten esto o se va ir a la porra todo*/}
      <div className="relative z-20 mr-auto max-w-lg">
        {/* carrusel horizontal scrollable, we can change it for another dynamic if you want guys, let me know */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-2 pr-4"
        >
          {images.map((image, index) => (
            <GlassCard
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>

        {/* Flechas de navegación */}
        <div className="mt-2 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-300 bg-white/80 text-slate-700 hover:bg-white"
            onClick={() => scroll("left")}
          >
            ‹
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-300 bg-white/80 text-slate-700 hover:bg-white"
            onClick={() => scroll("right")}
          >
            ›
          </Button>
        </div>
      </div>

      {/* Modal con imagen grande, SIN nombre */}
      <Dialog
        open={!!activeImage}
        onOpenChange={(open) => !open && setActiveImage(null)}
      >
        <DialogContent className="max-w-xl border border-white/20 bg-white/70 backdrop-blur-2xl">
          {activeImage && (
            <div className="flex justify-center">
              <img
                src={activeImage.src}
                alt="Preview"
                className="max-h-[420px] w-auto rounded-3xl bg-slate-100 object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function GlassCard({
  image,
  index,
  onClick,
}: {
  image: GlassGridImage;
  index: number;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
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
    <motion.button
      type="button"
      className={`group relative flex-shrink-0 focus:outline-none ${
        index !== 0 ? "-ml-10" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      whileHover={{
        scale: 1.08,
        translateY: -10,
        zIndex: 20,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <Card
        className="
          h-56 w-36
          sm:h-64 sm:w-44
          rounded-3xl border border-white/30
          bg-white/25
          shadow-lg shadow-sky-100/40
          backdrop-blur-xl
          transition-all duration-300
          group-hover:shadow-xl
          group-hover:bg-white/35
        "
      >
        <CardContent className="flex h-full w-full items-center justify-center p-3">
          <div className="h-full w-full overflow-hidden rounded-[1.8rem]">
            <img
              src={image.src}
              alt="Preview"
              className="
                h-full w-full
                rounded-[1.8rem]
                object-contain
                bg-slate-100/70
                transition duration-300
                group-hover:brightness-110 group-hover:contrast-105
              "
            />
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}
