<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/pr">
    <html>
        <head>
            <title>Project Record</title>
            <style>
                h1 {
                display: flex;
                justify-content: center;
                }
                li{
                margin: 10px;
                }
                .column {
                float: left;
                width: 50%;
                }
                
                /* Clear floats after the columns */
                .row:after {
                content: "";
                display: table;
                clear: both;
                }
            </style>
        </head>
        
        <body>
            <h1>Project Record</h1>
            
            <hr/>
            <div class="row">
            <xsl:for-each select="meta"> 
                <div class="column">
                <ul style="list-style-type:none;">
                    <li><b>KEY NAME: </b><xsl:value-of select="key"/></li>
                    <li><b>TITLE: </b><xsl:value-of select="title"/></li>
                    <xsl:apply-templates select="subtitle"/>
                </ul>
                </div>
                <div class="column">
                <ul style="list-style-type:none;">
                    <li><b>BEGIN DATE: </b><xsl:value-of select="bdate"/></li>
                    <li><b>END DATE: </b><xsl:value-of select="edate"/></li>
                    <li><b>SUPERVISOR: </b><a href="{supervisor/@url}"> <xsl:value-of select="supervisor"/></a></li>
                </ul>
                </div>
            </xsl:for-each>
            </div>
            <hr/>
            
            <hr/>
            <h3>WorkTeam:</h3>
            <xsl:for-each select="team">
                <ol>
                    <xsl:apply-templates select="member"/>
                </ol>
            </xsl:for-each>
            <hr/>
            
            <hr/>
            <h3>Abstract</h3>
            <xsl:for-each select="abstract">
                <!--<xsl:for-each select="p">
                    <ul style="list-style-type:none; list-style-position:inside; padding-left: 0;" >
                        <li> -->
                            <xsl:apply-templates/>
                        <!--</li>
                    </ul>
                </xsl:for-each>-->
            </xsl:for-each>
            <hr/>
            
            <hr/>
            <h3>Deliverables</h3>
                <xsl:for-each select="deliverables">
                    <xsl:for-each select="link">
                        <ul>
                            <li><a href="{@url}"> <xsl:value-of select="."/></a></li>
                        </ul>
                    </xsl:for-each>
                </xsl:for-each>
                <hr/>
        </body>
    </html>
    </xsl:template>    
    
    <xsl:template match="subtitle">
        <li><b>SUBTITLE: </b><xsl:apply-templates/></li>
    </xsl:template>
    
    <xsl:template match="member">
        <li>
            <b><xsl:value-of select="@id"/>: </b> <xsl:value-of select="name"/>
            <ul>
                <li> email: <xsl:value-of select="email"/></li>
                <xsl:apply-templates select="url" mode="member"/>
            </ul>
        </li>
    </xsl:template>
    
    <xsl:template match="url" mode="member">
        <li> url: <a href="{.}"><xsl:value-of select="."/></a></li>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
</xsl:stylesheet>