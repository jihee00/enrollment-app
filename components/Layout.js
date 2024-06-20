import MainNav from './MainNav';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <div>{props.children}</div>
      <br />
      <Footer />
      <br />
    </>
  );
}