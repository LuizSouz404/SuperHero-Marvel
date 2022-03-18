import { motion } from 'framer-motion';

type SkeletonSlider21Props = {
  title: string;
  isSquare?: boolean;
}

export function SkeletonSlider({title ,isSquare = false}: SkeletonSlider21Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      <strong className="text-white font-semibold text-xl">{title}</strong>
      <motion.div className="overflow-hidden">
        <motion.div drag="x" dragConstraints={{right: 0, left: -1024}} className="grid grid-cols-auto gap-2 grid-flow-col">
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
          <div className={`bg-slate-600 animate-pulse w-52 ${isSquare ? 'aspect-square' : 'aspect-2/1'} rounded-md`}></div>
        </motion.div>
      </motion.div>
    </div>
  )
}