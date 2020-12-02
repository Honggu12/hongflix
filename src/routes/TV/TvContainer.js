import React from "react";
import { tvApi } from "../../api";
import TvPresenter from "./TvPresenter";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();

      const {
        data: { results: popular },
      } = await tvApi.popular();

      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      this.setState({
        topRated,
        popular,
        airingToday,
      });
    } catch (error) {
      this.setState({
        error: "TV 정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  //함수형 컴포넌트에서 return에 해당된다.
  render() {
    const { topRated, popular, airingToday, error, loading } = this.state;

    return (
      <TvPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    );
  }
}
