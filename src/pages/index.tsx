import { Robot } from '@/components/Robot';

const GRID_CELLS = 5;

const Index = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto max-w-screen-md align-middle">
        <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-3xl lg:text-4xl	">
          ✨Jack Burns&apos;s Mr Yum Take Home✨
        </h1>
        {/* Render the magic ✨🤖 */}
        <Robot gridCells={GRID_CELLS} />
      </div>
    </div>
  );
};

export default Index;
