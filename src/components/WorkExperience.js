import React, { Component } from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import '../css/Experience.css';
import { Icon } from '@iconify/react';
import Badge from "react-bootstrap/Badge";

class WorkExperience extends Component {

    render() {
        let workItems = null;

        if (this.props.workInfo) {
            workItems = this.props.workInfo.map(function(item, i) {

                var technologies = item.technologies.map(function(technology, iTech) {
                    return (
                        <Badge pill className="main-badge mr-2 mb-2" key={iTech} bg="secondary">
                            {technology.name} <Icon icon={technology.class} height={15} color={technology.color} />
                        </Badge>
                    );
                });

                var descriptions = item.english.description.map(function(desc, iDes) {
                    return (
                        <li key={iDes} style={{ paddingLeft: '4px' }}>
                            {desc}
                        </li>
                    );
                });

                return (
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background: 'var(--color-surface)',
                            color: 'var(--color-text-primary)',
                            borderRadius: '12px',
                            border: '1px solid var(--color-surface-alt)',
                        }}
                        contentArrowStyle={{ borderRight: '7px solid var(--color-surface)' }}
                        date={item.startDate + " – " + item.endDate}
                        dateClassName="dateTimeElement"
                        iconStyle={{
                            background: 'var(--color-primary)',
                            color: '#fff',
                            boxShadow: '0 0 0 4px var(--color-background), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
                        }}
                        icon={<Icon icon={item.technologies[0].class} />}
                        visible={false}
                        key={i}
                    >
                        <h3 className="vertical-timeline-element-title workItemTitle">
                            <Badge pill className="main-badge mr-2 mb-2" bg="secondary">
                                {item.english.title}
                            </Badge>
                        </h3>
                        <hr className="itemHr" />

                        <h4 className="vertical-timeline-element-subtitle itemSubtitle">
                            Organization
                            <span style={{ paddingLeft: '10px', fontWeight: 400 }}>{item.organization}</span>
                        </h4>

                        <h4 className="vertical-timeline-element-subtitle itemSubtitle">
                            Location
                            <span style={{ paddingLeft: '10px', fontWeight: 400 }}>{item.location}</span>
                        </h4>

                        <h4 className="vertical-timeline-element-subtitle itemSubtitle">
                            Description
                            <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
                                {descriptions}
                            </ul>
                        </h4>

                        <hr className="itemHr" />

                        <div className="technologyTimeElement">
                            {technologies}
                        </div>
                    </VerticalTimelineElement>
                );
            });
        }

        return (
            <section className="work-experience" id="work-experience">
                <div className="container">
                    <div className="work-experience__header">
                        <span className="section-eyebrow">Experience</span>
                        <h1 className="work-experience__title">Work Experience</h1>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <VerticalTimeline animate={true}>
                            {workItems}
                        </VerticalTimeline>
                    </div>
                </div>
            </section>
        );
    }
}

export default WorkExperience;
