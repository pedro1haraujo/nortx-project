import * as React from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

export function useEmpresa() {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingEmpresa, setIsFetchingEmpresa] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return {
    isFetching,
    isFetchingEmpresa,
    isDeleting,
    isSaving,
    fetchEmpresas({ limite = 10, only = [] }) {
      return new Promise(async (resolve, reject) => {
        setIsFetching(true)

        only = only.length === 0? '': `["${only.join('","')}"]`
        let url = `empresas?limite=${limite}&only=${only}`

        await api.get(url).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar as empresas. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetching(false)
        })
      })
    },
    fetchEmpresa(empresaId) {
      return new Promise(async (resolve, reject) => {
        setIsFetchingEmpresa(true)

        await api.get(`empresas/${empresaId}`).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar a empresa. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetchingEmpresa(false)
        })
      })
    },
    saveEmpresa(empresa, proprietario, socios, obrigacoes) {
      return new Promise(async (resolve, reject) => {
        setIsSaving(true)

        await api.put(`empresas/${empresa.id}`, { empresa, proprietario, socios, obrigacoes }).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível salvar a empresa. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsSaving(false)
        })
      })
    },
    deleteEmpresa(empresaId) {
      return new Promise(async (resolve, reject) => {
        setIsDeleting(true)

        await api.delete(`empresas/${empresaId}`).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível excluir a empresa. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsDeleting(false)
        })
      })
    },
  };
}
