import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

const Topics = ({
    order,
    current,
    compact,
    className,
    username,
    categories,
}) => {

    const handleChange = selectedOption => {
        browserHistory.push(selectedOption.value);
    };

    const currentValue = current ? `/${order}/${current}` : `/${order}`;
    let selected = current === 'feed' ? `/@${username}/feed` : currentValue;

    if (compact) {
        const extras = username => {
            const ex = {
                allTags: order => ({
                    value: `/${order}`,
                    label: `${tt('g.all_tags')}`,
                }),
                myFeed: name => ({
                    value: `/@${name}/feed`,
                    label: `${tt('g.my_feed')}`,
                }),
            };
            return username
                ? [ex.allTags(order), ex.myFeed(username)]
                : [ex.allTags(order)];
        };

        const opts = extras(username).concat(
            categories
                .map(cat => {
                    const link = order ? `/${order}/${cat}` : `/${cat}`;
                    return { value: link, label: cat };
                })
                .toJS()
        );

        return (
            <span>
                <Select
                    name="select-topic"
                    className="react-select"
                    value={selected}
                    onChange={handleChange}
                    options={opts}
                    clearable={false}
                />
            </span>
        );
    } else {
        const categoriesLinks = categories.map(cat => {
            const link = order ? `/${order}/${cat}` : `/hot/${cat}`;
            return (
                <li className="c-sidebar__list-item" key={cat}>
                    <Link
                        to={link}
                        className="c-sidebar__link"
                        activeClassName="active"
                    >
                        {cat}
                    </Link>
                </li>
            );
        });
        return (
            <div className="c-sidebar__module">
                <div className="c-sidebar__header">
                    <Link
                        to={'/' + order}
                        className="c-sidebar__h3"
                        activeClassName="active"
                    >
                        {tt('g.all_tags')}
                    </Link>
                </div>
                <div className="c-sidebar__content">
                    <ul className="c-sidebar__list">
                        {categoriesLinks}
                        <li className="c-sidebar__link">
                            <Link
                                className="c-sidebar__link c-sidebar__link--emphasis"
                                to={`/tags`}
                            >
                                {tt('g.show_more_topics')}..
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

Topics.propTypes = {
    categories: React.PropTypes.object.isRequired,
    order: React.PropTypes.string.isRequired,
    current: React.PropTypes.string.isRequired,
    compact: React.PropTypes.bool.isRequired,
}

export default Topics;
