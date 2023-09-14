import * as React from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

export function useEmpresas() {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  return {
    isFetching,
    isLoadingMore,
    isSearching,
    fetchEmpresas() {
      return new Promise(async (resolve, reject) => {
        setIsFetching(true)

        await api.get('empresas').then(({ data }) => {
          resolve({ empresas: data.empresas, totalPaginas: data.total_paginas })
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível carregar as empresas. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetching(false)
        })
      })
    },
    loadMoreEmpresas(pagina) {
      return new Promise(async (resolve, reject) => {
        if (isFetching || isLoadingMore) {
          return;
        }
        setIsLoadingMore(true)

        await api.get(`/empresas?pagina=${pagina}`).then(({ data }) => {
          resolve({ empresas: data.empresas })
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível carregar mais empresas. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsLoadingMore(false)
        })
      })
    },
    searchEmpresas(search, pagina) {
      return new Promise(async (resolve, reject) => {
        if (search === '') {
          return;
        }
        setIsSearching(true)

        await api.get(`/empresas?search=${search}&pagina=${pagina}`).then(({ data }) => {
          resolve({ empresas: data.empresas })
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar a empresa. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsSearching(false)
        })
      })
    },
  };
}
