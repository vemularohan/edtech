export function Background3D() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Very subtle ambient teal top gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#14B8A6]/4 via-[#0F766E]/2 to-transparent blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-[20%] -left-32 w-80 h-80 bg-[#14B8A6]/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] -right-32 w-96 h-96 bg-[#0F766E]/2 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
