
import NavBar from "@/components/NavBar";

interface RootLayoutProps {
    children: React.ReactNode;
  }


export default async function RootLayout({ children }: RootLayoutProps)  {
  return (
    <div>
        <NavBar/>
        {children}
    </div>
  );
}
