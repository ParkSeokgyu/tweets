import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {children}
      <TabBar />
    </div>
  );
}