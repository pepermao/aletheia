import React, { useState, useEffect } from "react";
import { List, Button, Spin, Row } from "antd";
import { useTranslation } from "next-i18next";

const BaseList = ({
    apiCall,
    renderItem,
    filter = {}, // replaced 'query' parameter
    emptyFallback = <></>,
    style = {},
    footer = <></>
}) => {
    const { t } = useTranslation();

    const [ loading, setLoading ] = useState(false)
    const [ initLoading, setInitLoading ] = useState(true)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ totalItems, setTotalItems ] = useState(0)
    const [ items, setItems ] = useState([])
    const [ query, setQuery ] = useState({
        page: 1,
        pageSize: 10,
        fetchOnly: true,
        ...filter
    })

    useEffect(() => {
        apiCall(query).then(newItems => {
            setInitLoading(false)
            setLoading(false)
            setTotalPages(newItems.totalPages)
            setTotalItems(newItems.total)
            setItems(items => [...items, ...newItems.data])
        });
    }, [query, apiCall]);

    const loadMoreData = () => {
        setLoading(true);
        setQuery({
            ...query,
            page: query.page + 1
        })
    }

    const loadMoreButton =
        totalPages >= query.page ? (
            <div
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px"
                }}
            >
                <Button onClick={loadMoreData}>
                    {t("list:loadMoreButton")}
                </Button>
            </div>
        ) : null;

    if (
        items &&
        Array.isArray(items) &&
        (items.length > 0 || !emptyFallback)
    ) {
        return (
            <>
                <List
                    itemLayout="horizontal"
                    header={
                        <Row
                            style={{
                                textAlign: "center",
                                display: "block"
                            }}
                        >
                            {t("list:totalItems", {
                                total: totalItems
                            })}
                        </Row>
                    }
                    style={style || {}}
                    loadMore={loadMoreButton}
                    loading={loading}
                    dataSource={items}
                    renderItem={item => {
                        return (
                            <List.Item>
                                {renderItem(item)}
                            </List.Item>
                        );
                    }}
                />
                <Row
                    style={{
                        textAlign: "center",
                        display: "block",
                        marginBottom: "20px"
                    }}
                >
                    {t("list:totalItems", {
                        total: totalItems
                    })}
                </Row>
                {footer}
            </>
        );
    } else {
        if (initLoading) {
            return (
                <Spin
                    tip={t("global:loading")}
                    style={{
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "calc(50% - 40px)"
                    }}
                ></Spin>
            );
        } else {
            return emptyFallback;
        }
    }
}

export default BaseList;
