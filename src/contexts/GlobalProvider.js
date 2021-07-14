import React from 'react'
import User from './user/UserContext'
import Auth from './auth/AuthContext'
import Filter from './filter/FilterContext'
import UI from './ui/UIContext'

export default class GlobalProvider extends React.Component {
    render() {
        return (
            <Auth>
                <User>
                    <Filter>
                        <UI>
                            {this.props.children}
                        </UI>
                    </Filter>
                </User>
            </Auth>
        )
    }
}
