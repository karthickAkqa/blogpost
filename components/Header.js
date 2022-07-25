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
      <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
        <PrismicLink href="/" tabIndex="-1">
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
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
          <div className="grid grid-cols-1 gap-2 text-center">
            {prismicH.isFilled.richText(name) && (
              <Heading>
                <PrismicLink href="/">
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="font-serif text-2xl italic leading-normal tracking-tight primary-content">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight primary-content flex items-center">{children}</li>
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
      <div className="grid grid-cols-1 justify-items-center gap-20">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem>
              <PrismicLink href="/">
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
            {/* <select className="select select-bordered" data-choose-theme>
              <option value="" >Default</option>
              {themeValues.map((value) => (
                <option key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
              ))}
            </select> */}

            <div className="m-5">  
              <div className="inline-block w-10">
                <span data-toggle-theme="dark" data-act-class="pl-4" className="border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0">
                  <span className="rounded-full w-3 h-3 m-1 bg-green-700">
                  </span>
                </span>
              </div> 
            </div>
          </ul>
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