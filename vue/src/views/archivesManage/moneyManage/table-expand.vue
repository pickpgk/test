<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">其他费用1: </span>
                <span class="expand-value">{{ row.p_Other1 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">其他费用1: </span>
                <span class="expand-value">{{ row.p_Other1 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">其他费用2: </span>
                <span class="expand-value">{{ row.p_Other2 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">其他费用3: </span>
                <span class="expand-value">{{ row.p_Other3 }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">一阶单价: </span>
                <span class="expand-value">{{ row.p_Base1 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">一阶合计: </span>
                <span class="expand-value">{{ row.p_Price1 }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">一阶吨限: </span>
                <span class="expand-value">{{ row.p_Ton1 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">二阶单价: </span>
                <span class="expand-value">{{ row.p_Base2 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">二阶合计: </span>
                <span class="expand-value">{{ row.p_Price2 }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">二阶吨限: </span>
                <span class="expand-value">{{ row.p_Ton2 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">三阶单价: </span>
                <span class="expand-value">{{ row.p_Base3 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">三阶合计: </span>
                <span class="expand-value">{{ row.p_Price3 }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">三阶吨限: </span>
                <span class="expand-value">{{ row.p_Ton3 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">四阶单价: </span>
                <span class="expand-value">{{ row.p_Base4 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">四阶合计: </span>
                <span class="expand-value">{{ row.p_Price4 }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">四阶吨限: </span>
                <span class="expand-value">{{ row.p_Ton4 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">五阶单价: </span>
                <span class="expand-value">{{ row.p_Base5 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">五阶合计: </span>
                <span class="expand-value">{{ row.p_Price5 }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
