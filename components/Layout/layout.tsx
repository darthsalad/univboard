import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children } : LayoutProps) => {
	return (
		<>
			<Navbar />
      <main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;