import { NextPage, InferGetStaticPropsType } from 'next';
import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
// import style from '../styles/Layout.module.css'

const Post: NextPage = ({ children }) => {
  return (
    <article  >
      <header>
        <Header title="404 motivation not found" />
      </header>
      <div className="pt-6"></div>
      <main className="">
        { children }
      </main>
      <footer>
        <Footer title="404 motivation not found" />
      </footer>
    </article>
  )
}

export default Post