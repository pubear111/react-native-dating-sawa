import React from 'react'
import {UserContext} from './user/UserContext'
import {AuthContext} from './auth/AuthContext'
import {FilterContext} from './filter/FilterContext'
import {UIContext} from './ui/UIContext'

const consume = (Component) => {
    return (props) => (
        <AuthContext.Consumer>
            {auth => (
                <UserContext.Consumer>
                    {user => (
                        <FilterContext.Consumer>
                            {filter => (
                                <UIContext.Consumer>
                                    {ui => <Component {...props} user={user} auth={auth} filter={filter} ui={ui}/>}
                                </UIContext.Consumer>
                            )}
                        </FilterContext.Consumer>
                    )}
                </UserContext.Consumer>
            )}
        </AuthContext.Consumer>
    )
}

export default consume