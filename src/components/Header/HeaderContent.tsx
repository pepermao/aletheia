import {Col, Row} from "antd";
import {MenuOutlined, SearchOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const mapStateToProps = () => {
    return useSelector(
        (state) => {
            return {
                menuCollapsed: state?.menuCollapsed !== undefined ? state?.menuCollapsed : true,
            }
        }
    );
};

const HeaderContent = ({ className }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { menuCollapsed } = mapStateToProps();
    return <Row
        className={ className }
        style={{
            backgroundColor: "#2d77a3",
            boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
            height: "70px",
            padding: "0 15px",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Col span={2}>
            <a
                onClick={() => {
                    dispatch({
                        type: "TOGGLE_MENU",
                        menuCollapsed: !menuCollapsed
                    });
                }}
            >
                <MenuOutlined
                    style={{
                        fontSize: "16px",
                        color: "white",
                        padding: "8px"
                    }}
                />
            </a>
        </Col>
        <Col span={20}>
            <a onClick={() => router.push("/")}>
                <p
                    className="aletheia-logo"
                    style={{
                        fontFamily: "Noticia Text",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "26px",
                        lineHeight: 1,
                        marginBottom: "9px",
                        textAlign: "center",
                        color: "#ffffff",
                    }}
                >AletheiaFact</p>
            </a>
        </Col>
        <Col span={2}>
            <a
                onClick={() => {
                    const pathname = router.pathname;
                    dispatch({
                        type: "ENABLE_SEARCH_OVERLAY",
                        overlay: {
                            search: true,
                            results: pathname !== "/personality"
                        }
                    });
                }}
            >
                <SearchOutlined
                    style={{
                        fontSize: "16px",
                        color: "white",
                        padding: "8px"
                    }}
                />
            </a>
        </Col>
    </Row>
};

export default styled(HeaderContent)`
    @media (min-width: 768px) {
        .aletheia-header {
            padding: 0 30%;
        }
    }
`;
