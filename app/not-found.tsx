import { Boundary } from '../ui/boundary';

export default function NotFound() {
  return (
    <Boundary labels={['Page Not Found']} color="orange">
      <div className="space-y-4 text-vercel-orange">
        <h2 className="text-lg font-bold">Not Found</h2>

        <p className="text-sm">Could not find requested resource</p>
      </div>
    </Boundary>
  );
}
