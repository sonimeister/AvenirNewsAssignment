import { createStackNavigator, createAppContainer } from "react-navigation";
import { APP_ROUTE, APP_FONTS } from "../Constants/Constants";
import NewsDashboard from "../src/NewsDashboard";
import NewsDetail from "../src/NewsDetail";

const navigator = createStackNavigator(
  {
    NewsDashboard: {
      screen: NewsDashboard,
      navigationOptions: {
        title: "News",
        headerTitleStyle: {
          fontFamily: APP_FONTS.FONT_BOLD,
          fontSize: 20
        }
      }
    },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: {
        title: "NewsDetail",
        headerTitleStyle: {
          fontFamily: APP_FONTS.FONT_BOLD,
          fontSize: 20
        }
      }
    }
  },
  {
    initialRouteName: APP_ROUTE.NEWS_DASHBOARD
  }
);

const Router = createAppContainer(navigator);

export default Router;
