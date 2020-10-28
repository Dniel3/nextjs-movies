import * as React from "react";
import { render } from "@testing-library/react";
import Footer from "./footer";

it('should render footer', () => {
    expect(render(<Footer><div>footer</div></Footer>).asFragment).toMatchSnapshot();
});
