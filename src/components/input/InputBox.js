import React, {useState, useEffect} from 'react';
import publicIp from 'public-ip';
import axios from 'axios';
import './input.scss';
import { Button, Input } from "@chakra-ui/react";

export const InputBox = ({setContent, setCountry}) => {

    const [input, setInput] = useState('')

    const [loader, setLoader] = useState(false);

    const [scroll, setScroll] = useState(true)

    const getContent = (ip) => {
        setLoader(true);
        axios.get(`https://ipapi.co/${ip}/json/`)
            .then(res => {
                getCountry(res.data.country_name)
                setContent(res.data)
            })
            .finally(() => {
                setLoader(false);
            })
    }

    const getCountry = (countryName) => {
        axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
            .then(res => {
                setCountry(res.data[0]);
            })
    }

    const getPublicIp = () => {
        return publicIp.v4();
    }

    useEffect(() => {
        getPublicIp()
            .then(res => {
                setInput(res);
                getContent(res);
            })
    }, [])

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY < 50
            if (scrollCheck !== scroll) {
              setScroll(scrollCheck)
            }
          })
    })

    return (
        <div className={scroll ? 'app-inputbox' : 'app-inputbox input-box-small'}>
            <Input 
                value={input}
                onChange={e => setInput(e.target.value)} 
                className={"main-input"} 
                placeholder='IP Address'>     
            </Input>
            <Input disabled className={"main-input dummy-input"}></Input>
            <Button 
            onClick={() => getContent(input)} 
            isLoading={loader}
            loadingText="Searching"
            className={"main-button"} 
            variant='outline'
            >
                Track
            </Button>
        </div>
    )
}
