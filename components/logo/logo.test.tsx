import * as React from "react";
import Logo from "./logo";
import { render } from "@testing-library/react";

it('should render logo', () => {
    expect(render(<Logo />).asFragment).toMatchSnapshot();
});
