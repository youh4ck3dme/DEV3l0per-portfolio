import BootLoader from '../BootLoader';

export default function BootLoaderExample() {
  return (
    <BootLoader 
      onComplete={() => console.log('Boot complete!')} 
      duration={3000}
    />
  );
}
