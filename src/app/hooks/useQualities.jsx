import React, { useContext, useEffect, useState, useRef } from 'react'
import service from '../services/quality.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const prevState = useRef()

    useEffect(() => {
        const getQualities = async () => {
            try {
                const {content} = await service.all()
                setQualities(content)
                setIsLoading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    }, [])

    const getQuality = (id) => {
        return qualities.find((quality => quality._id === id))
    }
    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content} = await service.update(id, data)
            setQualities(prevState => prevState.map(quality => {
                if (quality._id === content._id)
                    return content
                return quality
            }))
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }
    const addQuality = async (data) => {
        try {
            const {content} = await service.create(data)
            setQualities(prevState => ([...prevState, content]))
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }
    const deleteQuality = async (id) => {
        prevState.current = qualities
        setQualities(prevState => prevState.filter(quality => quality._id !== id))
        try {
            await service.delete(id)
        } catch (error) {
            errorCatcher(error)
            setQualities(prevState.current)
        }
    }

    function errorCatcher (error) {
        const {message} = error.response.data
        setError(message)
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }

    }, [error])

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                getQuality,
                addQuality,
                updateQuality,
                deleteQuality
            }}
        >
            {!isLoading ? children : <h1>Qualities loading...</h1>}
        </QualitiesContext.Provider>
    )
}
