import { Header } from "./Header";
import { Footer } from "./Footer";
// import { AlgoliaSearch } from "./Search";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  withProfile,
  withSignUpForm,
  children,
}) => {
  return (
    <div className="text-slate-700 bg-emerald-50">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      
      {/* <AlgoliaSearch/>  */}
      <main>{children}</main>
      <div className="  bg-emerald-500 shadow">
        <Footer withSignUpForm={withSignUpForm} settings={settings} />
      </div>
    </div>
  );
};
