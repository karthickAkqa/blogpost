import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";
import {useEffect} from "react"
import {themeChange} from "theme-change";

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="px-4">
      <div className="relative flex flex-col max-w-3xl p-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
        
      <div className="flex items-center p-3 space-x-3">
          <PrismicLink href="/" tabIndex="-1">
            <div className="relative h-52 w-52 overflow-hidden  bg-slate-300">
              {prismicH.isFilled.image(profilePicture) && (
                <PrismicNextImage
                  field={profilePicture} 
                />
              )}
            </div>
          </PrismicLink>
        </div>
        <div className="p-3 space-y-1 flex items-center">
              {(prismicH.isFilled.richText(name) ||
                prismicH.isFilled.richText(description)) && (
                <div className="grid grid-cols-1 gap-2 text-left pl-4 pr-4  md:items-center">
                  {prismicH.isFilled.richText(name) && (
                    <Heading>
                      <PrismicLink href="/">
                        <PrismicText field={name} />
                      </PrismicLink>
                    </Heading>
                  )}
                  {prismicH.isFilled.richText(description) && (
                    <p className="font-roboto text-xl italic leading-normal tracking-tight primary-content">
                      <PrismicText field={description} />
                    </p>
                  )}
                </div>
              )}
        </div> 
      </div>
      <div className="pb-0 border-b shadow-lg bg-gray-100 md:flex md:items-center md:justify-between">
        {/* <PrismicLink href="/" tabIndex="-1">
          <div className="relative h-52 w-52 overflow-hidden  bg-slate-300">
            {prismicH.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                layout="fill"
                className="object-cover"
              />
            )}
          </div>
        </PrismicLink> 
        {(prismicH.isFilled.richText(name) ||
          prismicH.isFilled.richText(description)) && (
          <div className="grid grid-cols-1 gap-2 text-left pl-4 pr-4">
            {prismicH.isFilled.richText(name) && (
              <Heading>
                <PrismicLink href="/">
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="font-roboto text-2xl italic leading-normal tracking-tight primary-content">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}*/}
      </div>
    </div>
    
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight primary-content flex items-center text-zinc-50 px-2.5">{children}</li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {

  const themeValues = [
    "Light",
    "Dark",
  ]
  
  
  useEffect(()=> {
    themeChange(false)
  });

  

  return (
    <Bounded as="header">
      <div className="grid grid-cols-1 justify-items-center gap-9">
        <nav className="container px-2.5 mx-auto md:flex md:items-center text-center  md:justify-between bg-emerald-500 px-6 py-4 shadow">
          <ul className="flex flex-wrap justify-center">
            <NavItem>
              <PrismicLink  href="/">
                <PrismicText field={navigation.data.homepageLabel} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul> 
            <select className="inline-block selectbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " data-choose-theme>
              <option value="" >System</option>
              {themeValues.map((value) => (
                <option key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
              ))}
            </select>
        </nav>
            
        
        {withProfile && (
          <Profile
            name={settings.data.name}
            description={settings.data.description}
            profilePicture={settings.data.profilePicture}
          />
        )}
        {withDivider && <HorizontalDivider />}
      </div>
    </Bounded>
  );
};
