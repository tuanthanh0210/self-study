import {MigrationInterface, QueryRunner} from "typeorm";

export class db1719648863853 implements MigrationInterface {
    name = 'db1719648863853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`demo\`.\`latest_block\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', \`network\` varchar(255) NOT NULL COMMENT 'Network name', \`blockNumber\` int UNSIGNED NOT NULL COMMENT 'Block number', \`createdAt\` timestamp NOT NULL COMMENT 'Created at' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL COMMENT 'Updated at' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`demo\`.\`nft721\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', \`contractAddress\` varchar(42) NOT NULL COMMENT 'Contract address', \`tokenId\` int UNSIGNED NOT NULL COMMENT 'Token ID', \`fromAddress\` varchar(42) NOT NULL COMMENT 'From address', \`toAddress\` varchar(42) NOT NULL COMMENT 'To address', \`blockNumber\` int UNSIGNED NOT NULL COMMENT 'Block number', \`transactionHash\` varchar(66) NOT NULL COMMENT 'Transaction hash', \`blockHash\` varchar(66) NOT NULL COMMENT 'Block hash', \`event\` varchar(255) NOT NULL COMMENT 'Event', \`metadata\` text NULL COMMENT 'Metadata', \`tokenURI\` text NULL COMMENT 'Token URI', \`createdAt\` timestamp NOT NULL COMMENT 'Created at' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL COMMENT 'Updated at' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`demo\`.\`user\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL COMMENT 'Created at' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL COMMENT 'Updated at' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`demo\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`demo\`.\`nft721\``);
        await queryRunner.query(`DROP TABLE \`demo\`.\`latest_block\``);
    }

}
