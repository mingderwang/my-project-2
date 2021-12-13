import Link from "next/link";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import React from "react";
export default class App extends React.Component {
  static async getInitialProps({ query: { page = 1 } }) {
    try {
      const r = await fetch(
        `https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=${page}`
      );
      console.log("r", r);
      const d = await r.json();
      return {
        items: d.items,
        page: parseInt(page, 10),
      };
    } catch (e) {
      console.error(e);
      return {
        items: [],
        page: parseInt(page, 10),
      };
    }
  }

  render() {
    return (
      <div>
        <div className="btn-group">
          <button
            className="btn btn-outline btn-wide"
            onClick={() => Router.push(`/?page=${this.props.page - 1}`)}
            disabled={this.props.page <= 1}
          >
            -- PREV --
          </button>
          <button
            className="btn btn-outline btn-wide"
            onClick={() => Router.push(`/?page=${this.props.page + 1}`)}
            disabled={this.props.page >= 9}
          >
            ** NEXT **
          </button>
        </div>
        <Link href="/?page=1">
          <a>🦄 First page</a>
        </Link>
        <p>----</p>
        <ul>
          {this.props.items.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
