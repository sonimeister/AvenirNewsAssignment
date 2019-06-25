import React from "react";
import { shallow } from "enzyme";
import NewsDashboard from "./NewsDashboard";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("NewsDashboard", () => {
  it("should render without crashing Phone", () => {
    const wrapper = shallow(<NewsDashboard />);
    let instance = wrapper.instance();
    expect(wrapper.find("SafeAreaView")).toHaveLength(1);
    expect(instance).toBeTruthy();
  });
});
