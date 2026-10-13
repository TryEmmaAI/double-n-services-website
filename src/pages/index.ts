import type home from "./home";

export type Page = typeof home;

export const pages: Record<string, () => Promise<{ default: Page }>> = {
  "/": () => import("./home"),
  "/24-hour-water-damage-restoration-service/": () => import("./page_24_hour_water_damage_restoration_service"),
  "/air-duct-cleaning/": () => import("./page_air_duct_cleaning"),
  "/blog/": () => import("./page_blog"),
  "/brookhaven-ga/": () => import("./page_brookhaven_ga"),
  "/carpet-installation/": () => import("./page_carpet_installation"),
  "/carpet-repair/": () => import("./page_carpet_repair"),
  "/carpets-upholstery/": () => import("./page_carpets_upholstery"),
  "/category/uncategorized/": () => import("./page_category_uncategorized"),
  "/contact-us/": () => import("./page_contact_us"),
  "/es/": () => import("./page_es"),
  "/gallery/": () => import("./page_gallery"),
  "/hardwood-floor-refinishing/": () => import("./page_hardwood_floor_refinishing"),
  "/hardwood-flooring/": () => import("./page_hardwood_flooring"),
  "/how-can-a-carpet-make-a-home-more-comfortable-and-quiet/": () => import("./page_how_can_a_carpet_make_a_home_more_comfortable_and_quiet"),
  "/how-can-you-make-your-hardwood-floor-last-for-the-longest-time/": () => import("./page_how_can_you_make_your_hardwood_floor_last_for_the_longest_time"),
  "/how-to-maintain-the-hardwood-floors-properly/": () => import("./page_how_to_maintain_the_hardwood_floors_properly"),
  "/luxury-vinyl-flooring/": () => import("./page_luxury_vinyl_flooring"),
  "/marietta-ga/": () => import("./page_marietta_ga"),
  "/service-area/": () => import("./page_service_area"),
  "/smyrna-ga/": () => import("./page_smyrna_ga"),
  "/tile-and-grout-cleaning/": () => import("./page_tile_and_grout_cleaning"),
  "/tile-flooring/": () => import("./page_tile_flooring"),
  "/when-does-your-tile-floor-need-cleaning/": () => import("./page_when_does_your_tile_floor_need_cleaning"),
  "/when-should-you-get-your-carpets-replaced/": () => import("./page_when_should_you_get_your_carpets_replaced"),
  "/why-its-the-perfect-choice-for-your-home/": () => import("./page_why_its_the_perfect_choice_for_your_home"),
};
