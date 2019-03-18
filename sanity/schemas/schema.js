import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import meta from "./models/meta";
import social from "./models/social";
import petProjects from "./models/pet-project";
import backgrounds from "./models/backgrounds";
import years from "./models/years";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([meta, social, petProjects, backgrounds, years]),
});
