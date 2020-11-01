<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/> 
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <title>Arqueossítios de NW Portugês</title>
                </head>
                <body>
                    <h2>Arquivo dos Arqueossítios de NW Portugês</h2>
                    <h3>Índice dos Arquivo dos Arqueossítios de NW Portugês</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>       
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>        
    </xsl:template>
      
    <!-- ............................... Templare de Indices .................. -->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>

    <!-- ............................... Templare de Conteudos .................. -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="website/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <p><b>Tipo: </b><xsl:apply-templates select="TIPO"/></p>
                    <p><b>Identificação: </b><xsl:value-of select="IDENTI"/></p>
                    <p><xsl:apply-templates select="IMAGEM"/></p>
                    <p><xsl:apply-templates select="DESCRI"/></p>
                    <p><xsl:apply-templates select="CRONO"/></p>
                    <p><b>Lugar: </b><xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia: </b><xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho: </b><xsl:value-of select="CONCEL"/></p>
                    <p><xsl:apply-templates select="CODADM"/></p>
                    <p><xsl:apply-templates select="LATITU"/></p>
                    <p><xsl:apply-templates select="LONGIT"/></p>
                    <p><xsl:apply-templates select="ALTITU"/></p>
                    <p><xsl:apply-templates select="ACESSO"/></p>
                    <p><xsl:apply-templates select="QUADRO"/></p>
                    <p><xsl:apply-templates select="TRAARQ"/></p>
                    <p><xsl:apply-templates select="DESARQ"/></p>
                    <p><xsl:apply-templates select="INTERP"/></p>
                    <p><xsl:apply-templates select="DEPOSI"/></p>
                    <p><xsl:apply-templates select="INTERE"/></p>
                    <p><b>Bibliografia: </b> 
                    <ol>
                        <xsl:apply-templates select="BIBLIO"/>
                    </ol></p>
                    <p> <xsl:apply-templates select="AUTOR"/></p>
                    <p> <xsl:apply-templates select="DATA"/></p>
                    
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar à Home</a>]
                    </address>
                    <center>
                        <hr width="80%"/>
                    </center>
                </body>
            </html>
        </xsl:result-document> 
    </xsl:template>

    <xsl:template match="TIPO">
        <i><xsl:apply-templates select="@ASSUNTO"/></i>
    </xsl:template>
        
    <xsl:template match="IMAGEM">
        <b>Imagem: </b>
            <img>
                <xsl:attribute name="src">
                    <xsl:value-of select="@NOME"/>
                </xsl:attribute>
            </img>
    </xsl:template>
    
    <xsl:template match="DESCRI">
        <b>Descrição: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="CRONO">
        <b>Crono: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="CODADM">
        <b>Codadm: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="LATITU">
        <b>Latitude: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="LONGIT">
        <b>Longitude: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ALTITU">
        <b>Altitude: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <b>Acesso: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <b>Quadro: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <b>Traarq: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <b>Desarq: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="INTERP">
        <b>Interprete: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <b>Identificação: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <b>Interesse: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="AUTOR">
        <b>Autor: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="DATA">
        <b>Data: </b><xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <i><u> <xsl:value-of select="."/></u></i>
    </xsl:template>
    
 </xsl:stylesheet>