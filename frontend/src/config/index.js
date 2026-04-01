import dev from "./environment";
import prod from "./environment.prod";

const environmet=process.env.NODE_ENV === 'production' ? prod : dev

export default environmet;
